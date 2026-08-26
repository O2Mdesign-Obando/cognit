const asset = (name) => `/assets/cognit-demo/${name}`;

export const COGNIT_DEMO_IMAGES = Object.freeze({
  students: Object.freeze({
    "demo-student-eli-morgan": { src: asset("student-male.webp"), width: 640, height: 640, alt: "Eli Morgan" },
    "demo-student-sofia-reyes": { src: asset("student-generic.webp"), width: 640, height: 640, alt: "" },
    "demo-student-lena-grant": { src: asset("student-female.webp"), width: 640, height: 640, alt: "Lena Grant" },
    "demo-student-noah-bennett": { src: asset("student-generic.webp"), width: 640, height: 640, alt: "" },
    "demo-student-mina-park": { src: asset("student-generic.webp"), width: 640, height: 640, alt: "" },
    "demo-student-ava-thompson": { src: asset("student-generic.webp"), width: 640, height: 640, alt: "" }
  }),
  coaches: Object.freeze({
    "demo-coach-jordan-ellis": { src: asset("coach-placeholder.webp"), width: 640, height: 640, alt: "Jordan Ellis" }
  }),
  families: Object.freeze({
    "demo-family-morgan": { src: asset("family-son.webp"), width: 800, height: 613, alt: "Morgan Family" },
    "demo-family-reyes": { src: asset("family-daughter.webp"), width: 800, height: 800, alt: "Reyes Family" }
  }),
  contexts: Object.freeze({
    "demo-context-northfield-studio": { src: asset("center-placeholder.webp"), width: 640, height: 640, alt: "Northfield Studio" }
  }),
  narrative: Object.freeze({
    robotics: { src: asset("learning-robotics.webp"), width: 1200, height: 800, alt: "Student working with coding and robotics projects" }
  }),
  evidence: Object.freeze({
    prototypePhoto: { src: "/assets/placeholders/placeholder-student-male-scene.avif", width: 1024, height: 1024, alt: "Representative placeholder for a learner testing a prototype" }
  })
});

export const getDemoStudentImage = (id) => COGNIT_DEMO_IMAGES.students[id];
export const getDemoCoachImage = (id) => COGNIT_DEMO_IMAGES.coaches[id];
export const getDemoFamilyImage = (id) => COGNIT_DEMO_IMAGES.families[id];
export const getDemoContextImage = (id) => COGNIT_DEMO_IMAGES.contexts[id];
