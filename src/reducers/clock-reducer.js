import { START_LOADING, STOP_LOADING, LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";

import {
  UPDATE_CLOCK,
  SUMMIT_PHASE_AFTER,
  SUMMIT_PHASE_DURING,
  SUMMIT_PHASE_BEFORE,
  EVENT_PHASE_AFTER,
  EVENT_PHASE_DURING,
  EVENT_PHASE_BEFORE,
  EVENT_PHASE_ADD
} from '../actions/summit-actions'

const DEFAULT_STATE = {
  loading: false,
  nowUtc: null,
  summit_phase: null,
  events_phases: [],
}

const clockReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGOUT_USER:
      return DEFAULT_STATE;
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case UPDATE_CLOCK: {
      const { timestamp } = payload;
      return { ...state, nowUtc: timestamp };
    }
    case SUMMIT_PHASE_AFTER: {
      return { ...state, summit_phase: payload };
    }
    case SUMMIT_PHASE_DURING: {
      return { ...state, summit_phase: payload };
    }
    case SUMMIT_PHASE_BEFORE: {
      return { ...state, summit_phase: payload };
    }
    case EVENT_PHASE_ADD: {
      console.log('payload', payload);
      return { ...state, events_phases: [...state.events_phases, payload] };
    }
    case EVENT_PHASE_AFTER: {
      return { ...state, events_phases: [...state.events_phases, payload] };
    }
    case EVENT_PHASE_DURING: {
      return { ...state, events_phases: [...state.events_phases, payload] };
    }
    case EVENT_PHASE_BEFORE: {
      return { ...state, events_phases: [...state.events_phases, payload] };
    }    
    default:
      return state;
  }
}

export default clockReducer
