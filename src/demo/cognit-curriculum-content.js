const modules = ["creative-foundations", "creative-prototype", "creative-share", "creative-showcase"].map((id, index) => ({ id, sequence: index + 1, titleKey: `module.${id}.title`, summaryKey: `module.${id}.summary` }));
const activities = [
  { id:"map-habit-flow", groups:[
    { id:"map-purpose", blocks:[{type:"explanation",key:"group.map-purpose.explanation"},{type:"instruction",key:"group.map-purpose.instruction"},{type:"list",keys:[1,2,3].map(n=>`group.map-purpose.list.${n}`)},{type:"callout",tone:"tip",titleKey:"group.map-purpose.callout.title",key:"group.map-purpose.callout.text"}]},
    { id:"map-picture", blocks:[{type:"image",src:"/assets/cognit-demo/curriculum/habit-tracker-flow.svg"},{type:"question",key:"group.map-picture.question"}]}
  ]},
  { id:"build-navigation", groups:[
    { id:"build-state", partKey:"group.build-state.part", blocks:[{type:"explanation",key:"group.build-state.explanation"},{type:"code",language:"javascript",code:'let screen = "today";\n\nfunction completeHabit() {\n  screen = "streak";\n  renderScreen(screen);\n}'},{type:"callout",tone:"boundary",titleKey:"group.build-state.callout.title",key:"group.build-state.callout.text"}]},
    { id:"build-feedback", blocks:[{type:"instruction",key:"group.build-feedback.instruction"},{type:"list",keys:[1,2,3].map(n=>`group.build-feedback.list.${n}`)},{type:"question",key:"group.build-feedback.question"}]}
  ]},
  { id:"test-revise", groups:[
    { id:"test-observe", blocks:[{type:"instruction",key:"group.test-observe.instruction"},{type:"list",keys:[1,2,3].map(n=>`group.test-observe.list.${n}`)},{type:"callout",tone:"tip",titleKey:"group.test-observe.callout.title",key:"group.test-observe.callout.text"}]},
    { id:"test-reflect", blocks:[{type:"question",key:"group.test-reflect.question"}]}
  ]}
].map(activity => ({...activity,titleKey:`activity.${activity.id}.title`,summaryKey:`activity.${activity.id}.summary`,groups:activity.groups.map(group=>({...group,titleKey:`group.${group.id}.title`}))}));
export const creativeAppLabPresentation = Object.freeze({id:"creative-app-lab",modules,presentedModuleId:"creative-prototype",activities,contentProvenance:{kind:"original-fictional-demo-content",sourceRevision:"d0320f988a1fa6b33b4c3d302c55957c922c268b",sourceLocale:"en-US",targetLocale:"es-US",translationStatus:"candidate-human-review-pending",providerMaterialIncluded:false}});
export function getCreativeAppLabPresentation(audience){return new Set(["coach","student"]).has(audience)?creativeAppLabPresentation:null;}
