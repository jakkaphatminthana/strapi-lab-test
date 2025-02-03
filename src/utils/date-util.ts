const isValidDate = (date: string) => !isNaN(Date.parse(date));

const DateUtils = { isValidDate };
export default DateUtils;
