import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import followIfLoginRedirect from './api-authorization/followIfLoginRedirect';
import { WeatherForecastsClient } from '../web-api-client.ts';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  render() {
    let contents = this.state.loading
      ? <div className="p-d-flex p-jc-center"><ProgressSpinner /></div>
      : (
        <DataTable value={this.state.forecasts} className="p-datatable-sm">
          <Column field="date" header="Date" body={(rowData) => new Date(rowData.date).toLocaleDateString()} />
          <Column field="temperatureC" header="Temp. (C)" />
          <Column field="temperatureF" header="Temp. (F)" />
          <Column field="summary" header="Summary" />
        </DataTable>
      );

    return (
      <div>
        <h3>Weather Forecast</h3>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    let client = new WeatherForecastsClient();
    const data = await client.getWeatherForecasts();
    this.setState({ forecasts: data, loading: false });
  }
}
