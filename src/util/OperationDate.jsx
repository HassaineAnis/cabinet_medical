export const addDaysToDate = (startDate, daysToAdd) => {
    const date = new Date(startDate); // Convertir la date de départ en objet Date
    date.setDate(date.getDate() + daysToAdd); // Ajouter le nombre de jours spécifié
    return date.toLocaleDateString();
  };



 export const differenceEnJours = (date) => {
    // Convertir la date en objet Date
    const startDate = new Date(date);

    // Obtenir la date du jour (aujourd'hui)
    const endDate = new Date();

    // Vérifier si la date de sortie est supérieure ou égale à la date actuelle
    if (startDate <= endDate) {
      // Calculer la différence en millisecondes entre la date donnée et la date du jour
      const differenceEnMillisecondes = Math.abs(startDate - endDate);

      // Convertir la différence en jours
      const differenceEnJours = Math.floor(
        differenceEnMillisecondes / (1000 * 60 * 60 * 24)
      );

      return differenceEnJours;
    } else {
      // La date de sortie est déjà passée
      return null; // Ou vous pouvez retourner un message indiquant que la date de sortie est passée
    }
  };

  export function convertToISO8601(dateStr) {
    // Séparer la date en jour, mois et année en utilisant le délimiteur "/"
    const [day, month, year] = dateStr.split('/');
  
    // Réorganiser les parties de la date dans le format ISO 8601
    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  
    return isoDate;
  }

