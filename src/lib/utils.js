module.exports = {
  date(timestamp) {
    const date = new Date(timestamp);

    // YYYY
    const year = date.getUTCFullYear();
    // MM
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    // DD
    const day = `0${date.getUTCDate()}`.slice(-2);


    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      format: `${day}/${month}/${year}`
    };
  }
}