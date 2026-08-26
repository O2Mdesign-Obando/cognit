export const FAMILY_DEMO_INITIAL_STATE = Object.freeze({
  selectedConversation: "coach",
  replySent: false,
  absenceSubmitted: false,
  futureNoticeCancelled: false,
  registrationPrepared: false,
  supportPrepared: false,
  courseFilters: Object.freeze({ season: "all", category: "all", time: "all" }),
  preferences: Object.freeze({ reminders: true, learningUpdates: true, announcements: false })
});

export function reduceFamilyDemo(state = FAMILY_DEMO_INITIAL_STATE, action = {}) {
  switch (action.type) {
    case "SELECT_CONVERSATION": return { ...state, selectedConversation: action.id };
    case "SEND_REPLY": return { ...state, replySent: true };
    case "SUBMIT_ABSENCE": return { ...state, absenceSubmitted: true };
    case "CANCEL_FUTURE_NOTICE": return { ...state, futureNoticeCancelled: true };
    case "PREPARE_REGISTRATION": return { ...state, registrationPrepared: true };
    case "PREPARE_SUPPORT": return { ...state, supportPrepared: true };
    case "SET_COURSE_FILTER": return { ...state, courseFilters: { ...state.courseFilters, [action.key]: action.value } };
    case "SET_PREFERENCE": return { ...state, preferences: { ...state.preferences, [action.key]: Boolean(action.value) } };
    case "RESET": return { ...FAMILY_DEMO_INITIAL_STATE, courseFilters: { ...FAMILY_DEMO_INITIAL_STATE.courseFilters }, preferences: { ...FAMILY_DEMO_INITIAL_STATE.preferences } };
    default: return state;
  }
}

export const createFamilyDemoState = () => reduceFamilyDemo(undefined, { type: "RESET" });
