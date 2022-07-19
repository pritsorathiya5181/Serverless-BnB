import Iframe from "react-iframe";

function RoomVA() {
  return (
    <div className="Room">
      <h3>Room Booking Analysis</h3>
      <Iframe
        url="https://datastudio.google.com/embed/reporting/ac96e991-f6b0-4265-8b3c-c9732ad003ea/page/zm7xC"
        width="100%"
        height="600px"
        id="myId"
        className="RoomVA"
        display="initial"
        position="relative"
        allowFullScreen
      />
    </div>
  );
}

export default RoomVA;
