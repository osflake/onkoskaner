const today = new Date();
const quarter = Math.floor(today.getMonth() / 3);

function getLastDayOfYear(year: any) {
  return new Date(year, 11, 31);
}

// function getFirstDayOfYear(year: any) {
//   return new Date(year, 0, 1);
// }

const currentYear = new Date().getFullYear();

const startFullQuarter = new Date(today.getFullYear(), quarter * 3 - 3, 1);

// export const dateSince = (type: string) => {
//   switch (type) {
//     case "1":
//       return new Date(today.setDate(today.getDate() - 30))
//         .toISOString()
//         .split("T")[0];
//     case "2":
//       return new Date(today.setDate(today.getDate() - 60))
//         .toISOString()
//         .split("T")[0];
//     case "3":
//       return new Date(today.getFullYear(), quarter * 3 - 3, 1)
//         .toISOString()
//         .split("T")[0];
//     case "4":
//       return getFirstDayOfYear(currentYear - 1)
//         .toISOString()
//         .split("T")[0];
//     default:
//       return "";
//   }
// };

// export const dateTo = (type: string) => {
//   switch (type) {
//     case "1":
//       return new Date().toISOString().split("T")[0];
//     case "2":
//       return new Date().toISOString().split("T")[0];
//     case "3":
//       return new Date(
//         startFullQuarter.getFullYear(),
//         startFullQuarter.getMonth() + 3,
//         0
//       )
//         .toISOString()
//         .split("T")[0];
//     case "4":
//       return getLastDayOfYear(currentYear - 1)
//         .toISOString()
//         .split("T")[0];
//     default:
//       return "";
//   }
// };

export const dateTo = (type: string) => {
  switch (type) {
    case "1":
      return new Date().toISOString().split("T")[0];
    case "2":
      return new Date().toISOString().split("T")[0];
    case "3":
      return new Date(
        startFullQuarter.getFullYear(),
        startFullQuarter.getMonth() + 3,
        0
      )
        .toISOString()
        .split("T")[0];
    case "4":
      return getLastDayOfYear(currentYear - 1)
        .toISOString()
        .split("T")[0];

    default:
      return "";
  }
};

export const days = (type: string) => {
  switch (type) {
    case "1":
      return "30";
    case "2":
      return "60";
    case "3":
      return "90";
    case "4":
      return "365";
    default:
      return "";
  }
};
