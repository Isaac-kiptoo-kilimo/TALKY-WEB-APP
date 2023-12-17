export const getCurrentTimestamp = (): string => {

    const currentTimestamp = new Date().toISOString();
    return currentTimestamp;
  };
  