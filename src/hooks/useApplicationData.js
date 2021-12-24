import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // -- state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const fetchFreeSpots = (state, appointments) => {
    const appIds = state.days.filter(day => day.name === state.day);
    const todayApp = appIds[0].appointments;
    const emptyApp = todayApp.filter(app => !appointments[app].interview).length;
    return emptyApp;
  }

  // -- make request to API, then update new state via callback once API request is resolved
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((newState) => {
        const appointment = {
          ...newState.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...newState.appointments,
          [id]: appointment
        };
        const days = [
          ...newState.days,
        ]
        const dayIndex = newState.days.findIndex((day) =>
          day.appointments.includes(id)
        )
        const spots = fetchFreeSpots(newState, appointments)

        const newDay = {
          ...days[dayIndex], spots
        }
        days[dayIndex] = newDay

        return { ...newState, appointments, days };
      });

    });
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((newState) => {
        const appointment = {
          ...newState.appointments[id],
          interview: null
        };
        const appointments = {
          ...newState.appointments,
          [id]: appointment
        };
        const days = [
          ...newState.days,
        ]
        const dayIndex = newState.days.findIndex((day) =>
          day.appointments.includes(id)
        )
        const spots = fetchFreeSpots(newState, appointments)

        const newDay = {
          ...days[dayIndex], spots
        }
        days[dayIndex] = newDay

        return { ...newState, appointments, days };
      });
    });
  }

  // -- used to set the current day
  const setDay = day => setState({ ...state, day });

  // -- effect method; requests to API server to fetch state data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}