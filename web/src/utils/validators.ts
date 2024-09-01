export const isRequired = (message: string) => {
  return function (value: string) {
    return value ? undefined : message;
  };
};
