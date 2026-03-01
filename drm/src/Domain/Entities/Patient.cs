using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace drm.Domain.Entities;

public class Patient: BaseAuditableEntity
{
    public int PatientID { get; set; }
    public required string PatientFirstName { get; set; }
    public required string PatientLastName { get; set; }
    public string? PatientMiddleName { get; set; }  
    public required DateTime PatientDateOfBirth { get; set; }
    public Gender PatientGender { get;set; }
    public string? PatientHeight { get; set; }
    public string? PatientWeight { get; set; }
    public string? PatientMobilePhone { get; set;  }
    public string? PatientHomePhone { get; set; }
    public string? PatientHomeAddress1 { get; set;  }
    public string? PatientHomeAddress2 { get; set;  }
    public string? PatientCity { get; set; }    
    public string ? PatientState { get; set;  }
    public string? PatientPostalCode { get; set; }
    public string ? PatientMedicareNumber { get; set; }
    public string? PatientMedicaid { get; set; }    
    public string? PatientInsureNumber { get; set; }    
    public string? PatientFacility { get; set; }
    public string? PatientEmailAddress { get; set;  }

    public string? PatientMBINumber { get; set; }   


}
