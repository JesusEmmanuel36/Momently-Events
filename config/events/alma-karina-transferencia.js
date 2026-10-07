import { almaKarina } from "./alma-karina.js";

// Ambas vistas conservan el mismo slug: una sola cuenta y un solo evento.
export const almaKarinaTransferencia = {
  ...almaKarina,
  bank: {
    enabled: true,
    bank: "BBVA Bancomer",
    holder: "Alma Karina Balderrama Romero",
    transferNumber: "638180010187157925",
    transferLabel: "Número de tarjeta",
  },
};
