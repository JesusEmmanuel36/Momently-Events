function formatGoogleDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function openGoogleCalendar({ title, start, end, durationHours = 6, location = "", details = "" }) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    details,
    location,
  });
  const calendarWindow = window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank");
  if (calendarWindow) calendarWindow.opener = null;
  else window.location.assign(`https://calendar.google.com/calendar/render?${params.toString()}`);
}
