// validation.js — reusable validation helpers used by forms

const STATUS_SET = new Set(['open', 'in_progress', 'closed']); // Allowed values

export function validateTicketFields({ title, status, description, priority }) {
  const errors = {};

  if (!title || !title.trim()) {                    // Mandatory title
    errors.title = 'Title is required.';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!status) {                                    // Mandatory status
    errors.status = 'Status is required.';
  } else if (!STATUS_SET.has(status)) {             // Strict values only
    errors.status = 'Status must be open, in_progress, or closed.';
  }

  if (description && description.length > 500) {    // Optional but length-checked
    errors.description = 'Description must be 500 characters or less.';
  }

  if (priority && !['low','medium','high'].includes(priority)) {
    errors.priority = 'Priority must be low, medium, or high.';
  }

  return errors;                                    // Empty object means valid
}
