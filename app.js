const express = require("express");
const cors = require("cors");
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === "development";

// middleware
app.use(express.json());
// app.use(
//   cors({
//     origin: IS_DEVELOPMENT
//       ? "http://localhost:3000"
//       : "https://dtang-react-crud.surge.sh"
//   })
// );

const db = {
  brands: [
    {
      id: 1,
      brand: "BUHO",
      body:
        "BUHO is the first sustainable e-commerce site with products for everyone. Shop environmentally sustainable fashion, ethically made, vegan or vintage brands."
    },
    {
      id: 2,
      brand: "For Days",
      body:
        "We are the original closed loop clothing company. We are on a mission to make zero-waste available to everyone. We exist for You. For Us. For the Planet."
    },
    {
      id: 3,
      brand: "Everlane",
      body:
        "Timeless Pieces Made with High Quality Materials Designed to Last for Years. Ethical factories. Transparent pricing. Exceptional quality. Grade-A cashmere. Types: A-Grade Cashmere, Luxe Alpaca, Soft Cotton, Italian Merino, Luxe Wool."
    }
  ]
};

app.get("/api/brands", (request, response) => {
  response.json(db.brands);
});

app.brand("/api/brands", (request, response) => {
  const brand = request.body;
  brand.id = db.brands.length + 1;
  db.brands.push(brand);
  response.json(brand);
});

app.get("/api/brands/:id", (request, response) => {
  const id = Number(request.params.id);
  const brand = db.brands.find(brand => {
    return brand.id === id;
  });

  if (brand) {
    response.json(brand);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/brands/:id", (request, response) => {
  const id = Number(request.params.id);
  const brand = db.brands.find(brand => {
    return brand.id === id;
  });

  if (brand) {
    db.brands = db.brands.filter(brand => {
      return brand.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/brands/:id", (request, response) => {
  const id = Number(request.params.id);
  const brand = db.brands.find(brand => {
    return brand.id === id;
  });

  if (brand) {
    Object.assign(brand, request.body);
    response.json(brand);
  } else {
    response.status(404).send();
  }
});

app.listen(process.env.PORT || 8000);
