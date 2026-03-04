using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;
using Prometheus;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger/OpenAPI configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "DRM API", 
        Version = "v1",
        Description = "API documentation for DRM application with scalar types",
        Contact = new OpenApiContact
        {
            Name = "DRM Team",
            Email = "support@drm.com"
        }
    });
    
    // Add JWT Authentication to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    
    // Include XML comments
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
           .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
});
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);
builder.Services.AddCors();

// Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// Custom services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddTransient<IRolesService, RolesService>();

// Logging
builder.Host.UseSerilog((context, config) => 
    config.ReadFrom.Configuration(context.Configuration));

var app = builder.Build();

// Middleware
app.UseSerilogRequestLogging();
app.UseCors(policy => policy
    .WithOrigins("http://localhost:3000","http://localhost:3001", "http://nginx")
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.UseMetricServer();  // /metrics
app.UseHttpMetrics();
app.MapHealthChecks("/health");

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "DRM API V1");
        c.RoutePrefix = "swagger";
    });
}

app.MapControllers();

// // Seed data
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
//     try
//     {
//         // Check if database tables exist, if not create them
//         if (!db.Database.CanConnect())
//         {
//             db.Database.EnsureCreated();
//         }
//         else
//         {
//             // Try applying migrations, but don't fail if tables exist
//             try
//             {
//                 db.Database.Migrate();
//             }
//             catch (Exception migrateEx)
//             {
//                 // If migration fails due to existing tables, ignore
//                 if (!migrateEx.Message.Contains("already exists"))
//                 {
//                     throw;
//                 }
//                 Console.WriteLine($"Skipping migration (tables already exist): {migrateEx.Message}");
//             }
//         }
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"Database error: {ex.Message}");
//         throw;
//     }
// }

app.Run();