const COMMUNICATION_STATE_KEY = "cognit:center-demo-state:v2";
const COMMUNICATION_SCROLL_KEY = "cognit:center-communication-scroll:v1";

const readCenterState = () => {
  try { return JSON.parse(localStorage.getItem(COMMUNICATION_STATE_KEY) || "{}"); }
  catch { return {}; }
};

const writeCenterState = (state) => localStorage.setItem(COMMUNICATION_STATE_KEY, JSON.stringify(state));
const communicationState = (state) => ({
  read: { ...(state.communications?.read || {}) },
  replies: { ...(state.communications?.replies || {}) },
  drafts: { ...(state.communications?.drafts || {}) },
  sent: [...(state.communications?.sent || [])],
  announcements: [...(state.communications?.announcements || [])]
});

const persistCommunication = (state, communications) => {
  state.communications = communications;
  writeCenterState(state);
};

const attachmentRecord = (value) => {
  if (!value) return null;
  const [name, type, size] = value.split("|");
  return { name, type, size };
};

document.querySelectorAll("[data-communication-root]").forEach((root) => {
  const state = readCenterState();
  const communications = communicationState(state);
  const context = root.dataset.context;
  const base = root.dataset.base;

  const pendingScroll = (() => {
    try { return JSON.parse(sessionStorage.getItem(COMMUNICATION_SCROLL_KEY) || "null"); }
    catch { return null; }
  })();
  if (pendingScroll?.path === `${window.location.pathname}${window.location.search}` && Date.now() - pendingScroll.savedAt < 10000) {
    sessionStorage.removeItem(COMMUNICATION_SCROLL_KEY);
    window.requestAnimationFrame(() => {
      window.scrollTo({ left: pendingScroll.x, top: pendingScroll.y, behavior: "auto" });
      const conversationList = root.querySelector(".conversation-list");
      if (conversationList) conversationList.scrollTop = pendingScroll.listY;
      if (pendingScroll.keyboard) root.querySelector('[data-thread-card][aria-current="page"]')?.focus({ preventScroll: true });
    });
  } else if (pendingScroll) {
    sessionStorage.removeItem(COMMUNICATION_SCROLL_KEY);
  }
  root.querySelectorAll("[data-thread-card]").forEach((card) => card.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || card.target === "_blank") return;
    const destination = new URL(card.href);
    if (destination.origin !== window.location.origin) return;
    try {
      sessionStorage.setItem(COMMUNICATION_SCROLL_KEY, JSON.stringify({
        path: `${destination.pathname}${destination.search}`,
        x: window.scrollX,
        y: window.scrollY,
        listY: root.querySelector(".conversation-list")?.scrollTop || 0,
        savedAt: Date.now(),
        keyboard: event.detail === 0
      }));
    } catch { /* Selection still works when session storage is unavailable. */ }
  }));

  const updateAttachment = (select, preview, remove) => {
    if (!select || !preview) return;
    const render = () => {
      const attachment = attachmentRecord(select.value);
      preview.hidden = !attachment;
      preview.querySelector("span").textContent = attachment ? `${attachment.name} · ${attachment.type} · ${attachment.size}` : "";
    };
    select.addEventListener("change", render);
    remove?.addEventListener("click", () => { select.value = ""; render(); select.focus(); });
    render();
  };

  const localReplies = root.querySelector("[data-local-replies]");
  const activeThread = root.querySelector("[data-thread]");
  if (activeThread) {
    const threadId = activeThread.dataset.thread;
    const renderReplies = () => {
      if (!localReplies) return;
      localReplies.replaceChildren();
      (communications.replies[threadId] || []).forEach((reply) => {
        const section = document.createElement("section");
        section.className = "message outgoing";
        const heading = document.createElement("div");
        const sender = document.createElement("strong");
        const time = document.createElement("time");
        const body = document.createElement("p");
        sender.textContent = "Maya Chen";
        time.textContent = reply.timestamp;
        body.textContent = reply.body;
        heading.append(sender, time);
        section.append(heading, body);
        if (reply.attachment) {
          const attachment = document.createElement("aside");
          attachment.className = "attachment";
          const icon = document.createElement("span");
          const copy = document.createElement("div");
          const name = document.createElement("strong");
          const meta = document.createElement("small");
          icon.setAttribute("aria-hidden", "true"); icon.textContent = "▧";
          name.textContent = reply.attachment.name;
          meta.textContent = `${reply.attachment.type} · ${reply.attachment.size}`;
          copy.append(name, meta); attachment.append(icon, copy); section.append(attachment);
        }
        localReplies.append(section);
      });
    };
    communications.read[threadId] = true;
    persistCommunication(state, communications);
    root.querySelector(`[data-thread-card="${threadId}"] [data-unread-state]`)?.remove();
    renderReplies();
    if ((communications.replies[threadId] || []).length) {
      const threadCard = root.querySelector(`[data-thread-card="${threadId}"]`);
      threadCard?.querySelector("[data-reply-state]")?.remove();
      if (threadCard) threadCard.dataset.threadReply = "false";
      const threadState = root.querySelector("[data-thread-state]");
      if (threadState) threadState.textContent = "Sent";
    }

    const replyForm = root.querySelector("[data-reply-form]");
    if (replyForm) {
      const attachmentSelect = replyForm.elements.namedItem("attachment");
      updateAttachment(attachmentSelect, root.querySelector("[data-reply-attachment]"), root.querySelector("[data-remove-reply-attachment]"));
      replyForm.querySelector("[data-save-reply-draft]")?.addEventListener("click", () => {
        communications.drafts[threadId] = { body: replyForm.elements.namedItem("message").value, attachment: attachmentRecord(attachmentSelect.value), savedAt: "Today · 10:42 AM" };
        persistCommunication(state, communications);
        replyForm.querySelector("[data-reply-status]").textContent = "Draft saved.";
      });
      const draft = communications.drafts[threadId];
      if (draft) {
        replyForm.elements.namedItem("message").value = draft.body || "";
        if (draft.attachment) attachmentSelect.value = `${draft.attachment.name}|${draft.attachment.type}|${draft.attachment.size}`;
        attachmentSelect.dispatchEvent(new Event("change"));
        replyForm.querySelector("[data-reply-status]").textContent = "Draft restored.";
        const threadState = root.querySelector("[data-thread-state]");
        if (threadState) threadState.textContent = "Draft";
      }
      replyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!replyForm.reportValidity()) return;
        const reply = { body: replyForm.elements.namedItem("message").value.trim(), attachment: attachmentRecord(attachmentSelect.value), timestamp: "Today · 10:45 AM", state: "sent" };
        communications.replies[threadId] = [...(communications.replies[threadId] || []), reply];
        communications.read[threadId] = true;
        communications.drafts[threadId] = null;
        persistCommunication(state, communications);
        renderReplies();
        root.querySelector(`[data-thread-card="${threadId}"] [data-reply-state]`)?.remove();
        const threadState = root.querySelector("[data-thread-state]");
        if (threadState) threadState.textContent = "Sent";
        replyForm.reset();
        replyForm.querySelector("[data-reply-status]").textContent = "Sent. The thread is updated.";
        localReplies?.lastElementChild?.scrollIntoView({ block: "nearest" });
      });
    }
  }

  const applyMessageFilter = () => {
    const query = (root.querySelector("[data-message-search]")?.value || "").trim().toLowerCase();
    const active = root.querySelector("[data-message-filter][aria-pressed=true]")?.dataset.messageFilter || "all";
    let shown = 0;
    root.querySelectorAll("[data-thread-card]").forEach((card) => {
      const isRead = communications.read[card.dataset.threadCard] || card.dataset.threadRead === "read";
      const matches = (!query || card.dataset.search.includes(query)) && (active === "all" || active === card.dataset.threadType || (active === "unread" && !isRead) || (active === "reply" && card.dataset.threadReply === "true"));
      card.hidden = !matches;
      if (matches) shown += 1;
    });
    const result = root.querySelector("[data-message-results]");
    if (result) result.textContent = `${shown} ${shown === 1 ? "conversation" : "conversations"} shown`;
  };
  root.querySelector("[data-message-search]")?.addEventListener("input", applyMessageFilter);
  root.querySelectorAll("[data-message-filter]").forEach((button) => button.addEventListener("click", () => {
    root.querySelectorAll("[data-message-filter]").forEach((control) => control.setAttribute("aria-pressed", String(control === button)));
    applyMessageFilter();
  }));

  const renderLocalThreads = () => {
    const list = root.querySelector("[data-local-thread-list]");
    if (!list) return;
    list.replaceChildren();
    communications.sent.filter((message) => message.context === context).forEach((message) => {
      const article = document.createElement("article");
      article.className = "local-thread-summary";
      const strong = document.createElement("strong");
      const subject = document.createElement("b");
      const meta = document.createElement("small");
      strong.textContent = message.recipientLabel;
      subject.textContent = message.subject;
      meta.textContent = `Sent · ${message.timestamp}`;
      article.append(strong, subject, meta);
      list.append(article);
    });
    const messageCount = root.querySelector("[data-message-count]");
    if (messageCount) messageCount.textContent = String(root.querySelectorAll("[data-thread-card]").length + communications.sent.filter((message) => message.context === context).length);
  };
  renderLocalThreads();

  const composeForm = root.querySelector("[data-compose-form]");
  if (composeForm) {
    const params = new URLSearchParams(window.location.search);
    const recipient = composeForm.elements.namedItem("recipient");
    const student = composeForm.elements.namedItem("student");
    const course = composeForm.elements.namedItem("course");
    const subject = composeForm.elements.namedItem("subject");
    const message = composeForm.elements.namedItem("message");
    const attachment = composeForm.elements.namedItem("attachment");
    const prefills = {
      "billing:reyes": ["family:reyes", "demo-student-sofia-reyes", "demo-course-robotics-studio", "Robotics Studio payment follow-up", "We’re following up about the $190 amount due for Sofia’s Robotics Studio account. Please review the payment method when convenient."],
      "billing:park": ["family:park", "demo-student-mina-park", "demo-course-digital-storytelling-lab", "Digital Storytelling Lab payment method", "The payment method for Mina’s Digital Storytelling Lab account has expired. Please update it before the next payment."],
      "billing:thompson": ["family:thompson", "demo-student-ava-thompson", "demo-course-digital-storytelling-lab", "Payment method needed for Ava", "A payment method is needed for Ava’s Digital Storytelling Lab account. No charge has been attempted."],
      "attendance:mina-storytelling": ["family:park", "demo-student-mina-park", "demo-course-digital-storytelling-lab", "Mina’s Make-Up Token", "Mina’s reported absence qualified under Center policy, and a Make-Up Token was added automatically. It is available through October 19."],
      "attendance:creative-weather": ["family:morgan", "demo-student-eli-morgan", "demo-course-creative-app-lab", "Creative App Lab cancellation follow-up", "The cancelled Creative App Lab session automatically added a Make-Up Token to the Family account. No action is required today."],
      "coach:priya": ["coach:priya", "demo-student-sofia-reyes", "demo-course-robotics-studio", "Evidence needed for Sofia’s update", "Please attach the full sensor-trial summary, then resubmit Sofia’s update for Center review."],
      "coach:jordan": ["coach:jordan", "", "demo-course-creative-app-lab", "Creative App Lab follow-up", "I’m following up about the next Creative App Lab session."],
      "family:reyes": ["family:reyes", "demo-student-sofia-reyes", "demo-course-robotics-studio", "Sofia’s Robotics Studio update", "I’m following up with an update about Sofia’s Robotics Studio course."],
      "family:morgan": ["family:morgan", "demo-student-eli-morgan", "demo-course-creative-app-lab", "Eli’s Creative App Lab update", "I’m following up with an update about Eli’s Creative App Lab course."]
    };
    const key = params.has("billing") ? `billing:${params.get("billing")}` : params.has("attendance") ? `attendance:${params.get("attendance")}` : params.has("coach") ? `coach:${params.get("coach")}` : params.has("family") ? `family:${params.get("family")}` : params.has("reply") ? `coach:${params.get("reply")}` : "";
    const prefill = prefills[key];
    if (prefill && [...recipient.options].some((option) => option.value === prefill[0])) {
      [recipient.value, student.value, course.value, subject.value, message.value] = prefill;
    }
    updateAttachment(attachment, root.querySelector("[data-compose-attachment]"), root.querySelector("[data-remove-compose-attachment]"));
    const draftKey = `${context}:compose`;
    const draft = communications.drafts[draftKey];
    if (draft && !prefill) Object.entries(draft.values || {}).forEach(([name, value]) => { const control = composeForm.elements.namedItem(name); if (control) control.value = value; });
    composeForm.querySelector("[data-save-message-draft]")?.addEventListener("click", () => {
      communications.drafts[draftKey] = { values: Object.fromEntries(new FormData(composeForm)), savedAt: "Today · 10:42 AM" };
      persistCommunication(state, communications);
      composeForm.querySelector("[data-compose-status]").textContent = "Draft saved.";
    });
    composeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!composeForm.reportValidity()) return;
      const values = Object.fromEntries(new FormData(composeForm));
      const record = { id: `local-thread-${Date.now()}`, context, recipientId: values.recipient, recipientLabel: recipient.selectedOptions[0].textContent, subject: values.subject, body: values.message, studentId: values.student, courseId: values.course, priority: values.priority, attachment: attachmentRecord(values.attachment), state: "sent", timestamp: "Today · 10:45 AM" };
      communications.sent.unshift(record);
      communications.drafts[draftKey] = null;
      persistCommunication(state, communications);
      root.querySelector("[data-sent-recipient]").textContent = record.recipientLabel;
      root.querySelector("[data-sent-subject]").textContent = record.subject;
      const confirmation = root.querySelector("[data-sent-confirmation]");
      confirmation.hidden = false;
      composeForm.hidden = true;
      window.setTimeout(() => confirmation.focus(), 0);
    });
  }

  const renderLocalAnnouncements = () => {
    const list = root.querySelector("[data-local-announcements]");
    if (!list) return;
    list.replaceChildren();
    communications.announcements.filter((announcement) => announcement.context === context).forEach((announcement) => {
      const article = document.createElement("article");
      const status = document.createElement("span");
      const heading = document.createElement("h2");
      const body = document.createElement("p");
      const audience = document.createElement("strong");
      status.className = `announcement-status ${announcement.state}`;
      status.textContent = announcement.state[0].toUpperCase() + announcement.state.slice(1);
      heading.textContent = announcement.title;
      body.textContent = announcement.body;
      audience.textContent = `Audience · ${announcement.audienceLabel}`;
      article.append(status, heading, body, audience);
      list.append(article);
    });
  };
  renderLocalAnnouncements();

  root.querySelectorAll("[data-announcement-action]").forEach((button) => button.addEventListener("click", () => {
    button.textContent = button.dataset.announcementAction === "review" ? "Schedule reviewed" : "Announcement viewed";
  }));

  const announcementForm = root.querySelector("[data-announcement-form]");
  if (announcementForm) {
    const dialog = root.querySelector("[data-announcement-dialog]");
    const scheduleField = root.querySelector("[data-schedule-field]");
    const publishButton = root.querySelector("[data-publish-announcement]");
    const syncTiming = () => {
      const scheduled = announcementForm.elements.namedItem("timing").value === "scheduled";
      scheduleField.hidden = !scheduled;
      publishButton.textContent = scheduled ? "Schedule" : "Publish now";
    };
    announcementForm.querySelectorAll('[name="timing"]').forEach((control) => control.addEventListener("change", syncTiming));
    syncTiming();
    root.querySelector("[data-preview-announcement]")?.addEventListener("click", () => {
      if (!announcementForm.reportValidity()) return;
      root.querySelector("[data-preview-title]").textContent = announcementForm.elements.namedItem("title").value;
      root.querySelector("[data-preview-body]").textContent = announcementForm.elements.namedItem("body").value;
      root.querySelector("[data-preview-audience]").textContent = announcementForm.elements.namedItem("audience").selectedOptions[0].textContent;
      dialog.showModal();
    });
    const saveAnnouncement = (announcementState) => {
      if (!announcementForm.reportValidity()) return;
      const values = Object.fromEntries(new FormData(announcementForm));
      communications.announcements.unshift({ id: `local-announcement-${Date.now()}`, context, title: values.title, body: values.body, audienceId: values.audience, audienceLabel: announcementForm.elements.namedItem("audience").selectedOptions[0].textContent, state: announcementState, scheduledAt: values.scheduledAt || null, createdAt: "Sep 2, 2026" });
      persistCommunication(state, communications);
      announcementForm.querySelector("[data-announcement-status]").textContent = announcementState === "draft" ? "Draft saved." : announcementState === "scheduled" ? "Scheduled. The announcement is visible in Announcements." : "Published.";
    };
    root.querySelector("[data-save-announcement-draft]")?.addEventListener("click", () => saveAnnouncement("draft"));
    announcementForm.addEventListener("submit", (event) => { event.preventDefault(); saveAnnouncement(announcementForm.elements.namedItem("timing").value); });
  }
});
