var companyFounded = [];
var len = new Date().getFullYear();
for (var i = 1980; i <= len; i++) {
  companyFounded.push({
    value: String(i),
    label: i,
  });
}

var companyEmployees = [
  {
    value: "0-10",
    label: "0-10",
  },
  {
    value: "10-20",
    label: "10-20",
  },
  {
    value: "20-100",
    label: "20-100",
  },
  {
    value: "100-500",
    label: "100-500",
  },
];

var companyRate = [
  {
    value: "100-200 $",
    label: "100-200 $",
  },
  {
    value: "200-500 $",
    label: "200-500 $",
  },
  {
    value: "500-1000 $",
    label: "500-1000 $",
  },
  {
    value: "1000-2000 $",
    label: "1000-2000 $",
  },
];

export { companyFounded, companyEmployees, companyRate };
