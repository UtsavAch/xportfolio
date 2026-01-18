const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
      })
    : "Present";
export default formatDate;
