// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Noto Sans SC','-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#565a5c';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["内部大盘", "天使轮", "公司所有"],
    datasets: [{
      data: [25, 20, 55],
      backgroundColor: ['#9081a9', '#c2b4d7', '#48307f'],
    }],
  },
});