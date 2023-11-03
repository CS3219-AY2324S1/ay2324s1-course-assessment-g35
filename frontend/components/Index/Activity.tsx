// import ApexCharts from 'apexcharts'
// import ReactApexChart from "react-apexcharts";

export default function Activity() {
  const chartOptions = {
    labels: ["Label 1", "Label 2", "Label 3"],
    series: [40, 30, 20],
    chart: {
      type: "pie",
    },
  };
  
  // const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
  // chart.render();

  return (
    <>
      <h2 className="font-poppins text-white text-2xl font-bold overflow-hidden">
        Progress
      </h2>
      <div className="flex flex-row gap-x-4">
        {/* TODO: change the colors later! and more styling! it's ugly rn */}
        <div className="flex flex-col bg-pp-green w-[500px] rounded-[20px] items-center">
          <p className="font-poppins text-2xl font-bold text-white">10</p>
          <p>Easy</p>
        </div>
        <div className="flex flex-col bg-pp-blue w-[500px] rounded-[20px] items-center">
          <p className="font-poppins text-2xl font-bold text-white">20</p>
          <p>Medium</p>
        </div>
        <div className="flex flex-col bg-pp-lightpurple w-[500px] rounded-[20px] items-center">
          <p className="font-poppins text-2xl font-bold text-white">30</p>
          <p>Hard</p>
        </div>
      </div>
      {/* TODO: add chart below here - pie or donut chart */}
      {/* <div className="w-64 h-64">
        <ReactApexChart series={chartOptions.series} type="pie" />
      </div> */}
    </>
  );
}
