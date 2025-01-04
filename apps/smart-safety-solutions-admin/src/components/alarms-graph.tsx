import { useFetchAlarmsQuery } from '@smart-safety-solutions/apis';
import { FunctionComponent } from 'react';

const AlarmsGraph: FunctionComponent = () => {
  useFetchAlarmsQuery();

  return null;
};

export default AlarmsGraph;
