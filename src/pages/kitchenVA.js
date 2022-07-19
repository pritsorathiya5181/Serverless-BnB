import Iframe from "react-iframe";

function KitchenVA() {
  return (
    <div className="Kitchen">
      <h3>Kitchen Analysis</h3>
      <Iframe
        url="https://datastudio.google.com/embed/reporting/618c5416-b7f4-445c-964e-4352e2686ff6/page/9e8xC"
        width="100%"
        height="600px"
        id="myId"
        className="KitchenVA"
        display="initial"
        position="relative"
        allowFullScreen
      />
    </div>
  );
}

export default KitchenVA;
