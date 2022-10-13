export const isAuthenticated = (store) => {
    return Object.keys(store.state.user).length != 0
}

export const getReadableDate = (milliseconds) => {
  const readableDate = new Date(milliseconds).toDateString();
  return readableDate;
}