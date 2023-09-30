import { useMemo } from 'react';
import { Priority } from '../../types';

export const getPriorityData = (priority: Priority) => {
  switch (priority) {
    case Priority.low:
      return { color: 'success', icon: 'i-mdi-check' };
    case Priority.medium:
      return { color: 'secondary', icon: 'i-mdi-timelapse' };
    case Priority.high:
      return { color: 'warning', icon: 'i-mdi-warning', animation: 'animate-pulse' };
    case Priority.urgent:
      return { color: 'danger', icon: 'i-mdi-dangerous', animation: 'animate-pulse' };
    default:
      return { color: 'success', icon: 'i-mdi-check' };
  }
};

export const usePriorty = (priority: Priority) => {
  return useMemo(() => getPriorityData(priority), []);
};
