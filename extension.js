const NS = "ext-js-map-examples";

const FN_MAP = "FnMap";

export async function getInfo() {
  return {
    title: "Map Examples (JavaScript)",
    ns: NS,
    functions: {
      [FN_MAP]: {
        title: "Map Example",
        schema: { fields: {} },
        ui: {
          prefix: "Map",
          args: {},
        },
        examples: ["Show Map Example"],
      },
    },
  };
}

export async function handleRequest(body) {
  const { opName, info } = body;
  switch (opName) {
    case FN_MAP:
      return fnMap(info);
    default:
      return null;
  }
}

function fnMap(_info) {
  return {
    info: {
      type: "gmap",
    },
    data: {
      center: "41,29",
      zoom: 12,
      // https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#PinElementOptions
      pins: {
        a: {
          background: "#3366ff",
          borderColor: "#6699ff",
          glyphColor: "#0033dd",
          scale: 1.5,
        },
        b: {
          background: "#ff3366",
          borderColor: "#ff6699",
          glyphColor: "#dd0033",
          scale: 1,
        },
        c: {
          background: "#66ff33",
          borderColor: "#99ff66",
          glyphColor: "#33dd00",
          scale: 1.2,
        },
      },
      legends: {
        myGroup1: { label: "Group 1", color: "#3366ff" },
        myGroup2: { label: "Group 2", color: "#ff3366" },
        myGroup3: { label: "Group 3", color: "#33ff66" },
      },
      markers: [
        {
          isCluster: true,
          key: "myGroup1",
          markers: [
            {
              lat: 41.05,
              lng: 29.05,
              title: "Center",
              info: { sym: "AAPL", label: "Apple" },
            },
            {
              lat: 41.0,
              lng: 29.0,
              title: "A",
              pin: "a",
              info: { sym: "AMZN", label: "Amazon" },
            },
            {
              lat: 41.1,
              lng: 29.0,
              title: "B",
              pin: "b",
              info: { sym: "TSLA", label: "Tesla" },
            },
            {
              lat: 41.1,
              lng: 29.1,
              title: "C",
              pin: "c",
              info: { sym: "MSFT", label: "Microsoft" },
            },
            {
              lat: 41.0,
              lng: 29.1,
              title: "D",
              pin: {
                background: "#ff6633",
                borderColor: "#ff9966",
                glyphColor: "#dd3300",
                scale: 0.8,
              },
              info: { sym: "GOOGL", label: "Google" },
            },
          ],
        },
        {
          isCluster: false,
          key: "myGroup2",
          markers: [
            {
              lat: 42.05,
              lng: 28.05,
              title: "Center",
              info: { sym: "AAPL", label: "Apple" },
            },
            {
              lat: 42.0,
              lng: 28.0,
              title: "A",
              pin: "a",
              info: { sym: "AMZN", label: "Amazon" },
            },
            {
              lat: 42.1,
              lng: 28.0,
              title: "B",
              pin: "b",
              info: { sym: "TSLA", label: "Tesla" },
            },
            {
              lat: 42.1,
              lng: 28.1,
              title: "C",
              pin: "c",
              info: { sym: "MSFT", label: "Microsoft" },
            },
            {
              lat: 42.0,
              lng: 28.1,
              title: "D",
              pin: {
                background: "#ff6633",
                borderColor: "#ff9966",
                glyphColor: "#dd3300",
                scale: 0.8,
              },
              info: { sym: "GOOGL", label: "Google" },
            },
          ],
        },
      ],
      // https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
      polylines: [
        {
          key: "myGroup2",
          strokeColor: "#ff5522",
          strokeOpacity: 0.5,
          strokeWeight: 10,
          path: [
            { lat: 41.0, lng: 29.0 },
            { lat: 41.1, lng: 29.0 },
            { lat: 41.1, lng: 29.1 },
            { lat: 41.0, lng: 29.1 },
            { lat: 41.0, lng: 29.0 },
          ],
          info: { sym: "GOOGL", label: "Google" },
        },
      ],
      polygons: [
        {
          key: "myGroup3",
          strokeColor: "#22ff55",
          strokeOpacity: 0.7,
          strokeWeight: 5,
          fillColor: "#22ff55",
          fillOpacity: 0.4,
          path: [
            { lat: 41.02, lng: 29.02 },
            { lat: 41.08, lng: 29.02 },
            { lat: 41.08, lng: 29.08 },
            { lat: 41.02, lng: 29.08 },
            { lat: 41.02, lng: 29.02 },
          ],
          info: { sym: "MSFT", label: "Microsoft" },
        },
      ],
      heatmaps: [
        {
          key: "myGroup3",
          // https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions
          points: [
            [42.02, 31.02],
            [42.04, 31.04, 2],
            [42.06, 31.06, 3],
            [42.08, 31.08, 4],
            [42.1, 31.1, 5],
          ],
        },
      ],
    },
  };
}
