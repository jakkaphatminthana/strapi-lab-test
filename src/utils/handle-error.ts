interface Props {}

export const handleError = (
  ctx,
  status: number,
  message: string,
  detail?: string
) => {
  console.log(message, detail ? `Details: ${detail}` : "");
  ctx.throw(status, message, { moreDetail: detail });
};
