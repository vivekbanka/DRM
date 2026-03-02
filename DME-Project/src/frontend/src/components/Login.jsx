import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Messages } from 'primereact/messages';
import { useRef } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const messages = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      messages.current?.show([
        { severity: 'success', summary: 'Success', detail: 'Login successful!' }
      ]);
    } else {
      messages.current?.show([
        { severity: 'error', summary: 'Error', detail: result.message }
      ]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <Card title="Login" className="w-full md:w-6 lg:w-4">
        <form onSubmit={handleSubmit} className="p-fluid">
          <Messages ref={messages} />
          
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              required
            />
          </div>

          <Button
            type="submit"
            label="Login"
            loading={isLoading}
            className="w-full"
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
