import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="p-grid">
        <div className="p-col-12">
          <Card title="Welcome to DRM" className="p-card">
            <p className="p-mb-3">
              This is a modern React application built with PrimeReact and Vite.
            </p>
            <div className="p-d-flex p-gap-3">
              <Button label="Get Started" icon="pi pi-play" className="p-button-primary" />
              <Button label="Learn More" icon="pi pi-info-circle" className="p-button-outlined" />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
