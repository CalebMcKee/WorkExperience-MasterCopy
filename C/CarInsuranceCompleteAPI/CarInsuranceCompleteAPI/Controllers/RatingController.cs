
using System.Web.Http;
using CarInsuranceCompleteAPI.Models;
//http://blog.jonathanchannon.com/2013/09/16/enabling-cors-in-iisexpress/
namespace CarInsuranceCompleteAPI.Controllers
{
    public class RatingController : ApiController
    {
        // Global Variables
        private const double BasePrice = 500;
        private const int MaxYears = 5;

        // base pricing + modifiers
        public double CalculateRates(RatingModel model)
        {
            /*
             * Age
             * Gender
             * No Claims 
             * Cost of car
             * Length of insurance(one month = total/12 + 5%...)
             * Location(car storage...)
             * [multiple insured :-O]
            */

            double totalCost = BasePrice;

            totalCost = totalCost * GetCarStorageModifier(model.CarStorage);
            totalCost = totalCost * GetPersonalModifier(model.Age, model.Gender);
            totalCost = totalCost * GetNoClaimsModifier(model.NoClaimsBonus);
            totalCost = totalCost * GetCarCostModifier(model.CostOfCar);

            return CalculatePriceForDuration(totalCost, model.InsuranceDuration);
        }

        private double CalculatePriceForDuration(double total, int duration)
        {
            if (duration < 12)
            {
                //one month = total/12 + 5%
                double monthlyCost = (total/12) + ((total/100)*5);
                total = monthlyCost * duration;
            }

            return total;
        }

        #region "Private Modifiers"
        private double GetPersonalModifier(int age, string gender)
        {
            //Set a default value for the modifier
            double modifier = 1.08;

            /* Applies following rules:
             *      - If male and between 17 and 21 then rate is 1.5
             *      - If male and between 21 and 25 then rate is 1.15
             *      - If male and over 25 then rate is 1.12
             *      - If female and under 25 then rate is 1.1
             *      - If female and over 25 then rate is 1.08
             */
            if (gender.Equals("M") || gender.Equals("m"))
            {
                if (age > 17 && age <= 21)
                {
                    modifier = 1.5;
                }
                else if (age > 21 && age < 25)
                {
                    modifier = 1.15;
                }
                else
                {
                    modifier = 1.12;
                }
            }
            else if (gender.Equals("F") || gender.Equals("f"))
            {
                if (age < 25)
                    modifier = 1.1;
            }

            return modifier;
        }

        private double GetNoClaimsModifier(int years)
        {
            double modifier = 1;
            /*
             * For every year of no claims take off 0.05 up to a maximum of 5 years
             */
            for (int index = 0; index < years && index <= MaxYears; index++)
                modifier = modifier - 0.05;

            return modifier;
        }

        private double GetCarCostModifier(int carCost)
        {
            double modifier = 1;
            if (carCost > 25000)
            {
                modifier = 2;
            }
            else if (carCost > 10000 && carCost < 25000)
            {
                modifier = 1.5;
            }

            return modifier;
        }

        private double GetCarStorageModifier(string location)
        {
            double modifier = 1;
            if (location.Contains("Public Road"))
            {
                modifier = 1.8;
            }
            else if (location.Contains("Driveway"))
            {
                modifier = 0.9;
            }
            else if (location.Contains("Garage"))
            {
                modifier = 0.9;
            }
            return modifier;
        }
        #endregion
    }
}
