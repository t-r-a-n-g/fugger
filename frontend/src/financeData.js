export default [
  {
    id: 1,
    cat_name: "Revenues",
    months: [
      {
        name: "Jan22",
        transfer: 100,
        budget: 50,
        abs: -50,
        pct: "-50%",
      },
      { name: "Feb22", transfer: 200, budget: 50, abs: -50, pct: "-50%" },
    ],
    subcategories: [
      {
        id: 1,
        category_id: 1,
        name: "Revenue Stream 1",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 1,
            subcategory_id: 1,
            number: 3000,
            name: "Umsatzerlöse 1",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 2,
            subcategory_id: 1,
            number: 3002,
            name: "Umsatzerlöse 2",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        category_id: 1,
        name: "Revenue Stream 2",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 3,
            subcategory_id: 2,
            number: 3003,
            name: "Gewinne",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
    ],
  },
  // here begins another main category
  {
    id: 2,
    cat_name: "Cost of Sold Goods",
    months: [
      { name: "Jan22", transfer: 300, budget: 50, abs: -50, pct: "-50%" },
      { name: "Feb22", transfer: 400, budget: 50, abs: -50, pct: "-50%" },
    ],
    subcategories: [
      {
        id: 3,
        category_id: 2,
        name: "COGS 1",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 4,
            subcategory_id: 2,
            number: 3005,
            name: "Irgendwelche Kosten",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 5,
            subcategory_id: 2,
            number: 3010,
            name: "Andere Kosten",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
    ],
  },
  // here begins another main category
  {
    id: 3,
    cat_name: "Operating expenses",
    months: [
      { name: "Jan22", transfer: 500, budget: 50, abs: -50, pct: "-50%" },
      { name: "Feb22", transfer: 600, budget: 50, abs: -50, pct: "-50%" },
    ],
    subcategories: [
      {
        id: 4,
        category_id: 3,
        name: "Employee expenses",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 6,
            subcategory_id: 4,
            number: 4005,
            name: "Gehälter",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 7,
            subcategory_id: 2,
            number: 3050,
            name: "Löhne",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
      {
        id: 5,
        category_id: 3,
        name: "Marketing",
        months: [
          { name: "Jan22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
          { name: "Feb22", transfer: 100, budget: 50, abs: -50, pct: "-50%" },
        ],
        datev_accounts: [
          {
            id: 8,
            subcategory_id: 5,
            number: 8005,
            name: "TV Werbung",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
          {
            id: 9,
            subcategory_id: 5,
            number: 4050,
            name: "Streaming",
            months: [
              {
                name: "Jan22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
              {
                name: "Feb22",
                transfer: 100,
                budget: 50,
                abs: -50,
                pct: "-50%",
              },
            ],
          },
        ],
      },
    ],
  },
];
