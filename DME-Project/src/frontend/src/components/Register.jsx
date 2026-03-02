import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Messages } from 'primereact/messages';
import { useRef } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const messages = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register(email, password, firstName, lastName);
    
    if (result.success) {
      messages.current?.show([
        { severity: 'success', summary: 'Success', detail: 'Registration successful! Please login.' }
      ]);
      // Clear form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } else {
      messages.current?.show([
        { severity: 'error', summary: 'Error', detail: result.message }
      ]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <Card title="Register" className="w-full md:w-6 lg:w-4">
        <form onSubmit={handleSubmit} className="p-fluid">
          <Messages ref={messages} />
          
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <InputText
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <InputText
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

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
              feedback={true}
              required
            />
          </div>

          <Button
            type="submit"
            label="Register"
            loading={isLoading}
            className="w-full"
          />
        </form>
      </Card>
    </div>
  );
};

export default Register;
