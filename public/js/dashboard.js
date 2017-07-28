$( document ).ready(function() {
  var socket = io.connect();

//Dashboard de temperatura
  var temperatura = new RadialGauge({
    renderTo: 'temperatura',
    width: 300,
    height: 300,
    units: "°C",
    title: "Temperatura",
    minValue: -50,
    maxValue: 130,
    majorTicks: [
        -50,
        -40,
        -30,
        -20,
        -10,
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
        130,
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": -50,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 0,
            "to": 130,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    ticksAngle: 225,
    startAngle: 67.5,
    colorMajorTicks: "#ddd",
    colorMinorTicks: "#ddd",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "#222",
    borderShadowWidth: 0,
    borders: true,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    colorBorderOuter: "#333",
    colorBorderOuterEnd: "#111",
    colorBorderMiddle: "#222",
    colorBorderMiddleEnd: "#111",
    colorBorderInner: "#111",
    colorBorderInnerEnd: "#333",
    colorNeedleShadowDown: "#333",
    colorNeedleCircleOuter: "#333",
    colorNeedleCircleOuterEnd: "#111",
    colorNeedleCircleInner: "#111",
    colorNeedleCircleInnerEnd: "#222",
    valueBoxBorderRadius: 0,
    colorValueBoxRect: "#222",
    colorValueBoxRectEnd: "#333"
  }).draw();

//dashboard de humedad
  var humedad = new RadialGauge({
    renderTo: 'humedad',
    width: 300,
    height: 300,
    units: "%",
    title: "Humedad",
    minValue: 0,
    maxValue: 100,
    majorTicks: [
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100"
    ],
    minorTicks: 2,
    strokeTicks: true,
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
  }).draw();

//dashboard de puntoRocio
  var puntoRocio = new LinearGauge({
    renderTo: 'puntoRocio',
    width: 100,
    height: 300,
    units: "°C",
    title: "punto rocio",
    minValue: -20,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 20,
    majorTicks: [
        "-20",
        "-10",
        "0",
        "10",
        "20"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 0,
            "to": 10,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: true,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    barWidth: 10,
    value: 0
  }).draw();

//dashboard de presion
  var presion = new RadialGauge({
    renderTo: 'presion',
    width: 300,
    height: 300,
    units: "Km/h",
    minValue: 0,
    maxValue: 220,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100",
        "120",
        "140",
        "160",
        "180",
        "200",
        "220"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 160,
            "to": 220,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
  }).draw();

//dashboard de velViento
  var velViento = new RadialGauge({
      renderTo: 'velViento',
      width: 300,
      height: 300,
      units: "Km/h",
      minValue: 0,
      startAngle: 90,
      ticksAngle: 180,
      valueBox: false,
      maxValue: 220,
      majorTicks: [
          "0",
          "20",
          "40",
          "60",
          "80",
          "100",
          "120",
          "140",
          "160",
          "180",
          "200",
          "220"
      ],
      minorTicks: 2,
      strokeTicks: true,
      highlights: [
          {
              "from": 160,
              "to": 220,
              "color": "rgba(200, 50, 50, .75)"
          }
      ],
      colorPlate: "#fff",
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleWidth: 2,
      needleCircleSize: 7,
      needleCircleOuter: true,
      needleCircleInner: false,
      animationDuration: 1500,
      animationRule: "linear"
  }).draw();

//Dashboard de dirViento
  var dirViento = new RadialGauge({
      renderTo: 'dirViento',
      width: 300,
      height: 300,
      minValue: 0,
      maxValue: 360,
      majorTicks: [
          "N",
          "NE",
          "E",
          "SE",
          "S",
          "SW",
          "W",
          "NW",
          "N"
      ],
      minorTicks: 22,
      ticksAngle: 360,
      startAngle: 180,
      strokeTicks: false,
      highlights: false,
      colorPlate: "#3a3",
      colorMajorTicks: "#f5f5f5",
      colorMinorTicks: "#ddd",
      colorNumbers: "#ccc",
      colorNeedle: "rgba(240, 128, 128, 1)",
      colorNeedleEnd: "rgba(255, 160, 122, .9)",
      valueBox: false,
      valueTextShadow: false,
      colorCircleInner: "#fff",
      colorNeedleCircleOuter: "#ccc",
      needleCircleSize: 15,
      needleCircleOuter: false,
      animationRule: "linear",
      needleType: "line",
      needleStart: 75,
      needleEnd: 99,
      needleWidth: 3,
      borders: true,
      borderInnerWidth: 0,
      borderMiddleWidth: 0,
      borderOuterWidth: 10,
      colorBorderOuter: "#ccc",
      colorBorderOuterEnd: "#ccc",
      colorNeedleShadowDown: "#222",
      borderShadowWidth: 0,
      animationDuration: 1500
  }).draw();

//dashboard de mmAgua
  var mmAgua = new LinearGauge({
    renderTo: 'mmAgua',
    width: 400,
    height: 150,
    minValue: 0,
    maxValue: 100,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100"
    ],
    minorTicks: 10,
    strokeTicks: true,
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    barBeginCircle: false,
    tickSide: "left",
    numberSide: "left",
    needleSide: "left",
    needleType: "line",
    needleWidth: 3,
    colorNeedle: "#222",
    colorNeedleEnd: "#222",
    animationDuration: 1500,
    animationRule: "linear",
    animationTarget: "plate",
    barWidth: 5,
    ticksWidth: 50,
    ticksWidthMinor: 15
  }).draw();

//dashboard de UV
  var uv = new LinearGauge({
    renderTo: 'uv',
    width: 120,
    height: 400,
    units: "°C",
    minValue: 0,
    maxValue: 220,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100",
        "120",
        "140",
        "160",
        "180",
        "200",
        "220"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 100,
            "to": 220,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    animationDuration: 1500,
    animationRule: "linear",
    tickSide: "left",
    numberSide: "left",
    needleSide: "left",
    barStrokeWidth: 7,
    barBeginCircle: false,
    value: 75
  }).draw();

//dashboard de lummens
  var lummens = new RadialGauge({
    renderTo: 'lummens',
    width: 300,
    height: 300,
    units: "Km/h",
    minValue: 0,
    maxValue: 220,
    majorTicks: [
        "0",
        "20",
        "40",
        "60",
        "80",
        "100",
        "120",
        "140",
        "160",
        "180",
        "200",
        "220"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 160,
            "to": 220,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
  }).draw();


//Funciones que actualizan los valores del dashboard
  //actualiza valor dashboard temperatura
  socket.on('new temperatura', function(data) {
    console.log("Entro a new temperatura");
    temperatura.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard humedad
  socket.on('new humedad', function(data) {
    console.log("Entro a new humedad");
    humedad.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard puntoRocio
  socket.on('new puntoRocio', function(data) {
    console.log("Entro a new puntoRocio");
    puntoRocio.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard presion
  socket.on('new presion', function(data) {
    console.log("Entro a new presion");
    presion.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard velViento
  socket.on('new velViento', function(data) {
    console.log("Entro a new velViento");
    velViento.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard dirViento
  socket.on('new dirViento', function(data) {
    console.log("Entro a new dirViento");
    dirViento.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard mmAgua
  socket.on('new mmAgua', function(data) {
    console.log("Entro a new mmAgua");
    mmAgua.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard UV
  socket.on('new uv', function(data) {
    console.log("Entro a new uv");
    uv.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });
  //actualiza valor dashboard lummens
  socket.on('new lummens', function(data) {
    console.log("Entro a new lummens");
    lummens.value = parseFloat(data.value);
    console.log(parseFloat(data.value));
  });

});
