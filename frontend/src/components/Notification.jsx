const Notification = ({ message, style }) => {
  let stylesOfMessage = "green";
  if (style === "red") {
    stylesOfMessage = "red";
  }
  if (message && message !== null) {
    return <div className={stylesOfMessage}>{message}</div>;
  }
};

export default Notification;
