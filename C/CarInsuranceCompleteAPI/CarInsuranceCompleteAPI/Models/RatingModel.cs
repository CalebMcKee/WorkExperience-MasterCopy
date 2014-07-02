using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarInsuranceCompleteAPI.Models
{
    public class RatingModel
    {
        public string Gender { get; set; }
        public int Age { get; set; }
        public int NoClaimsBonus { get; set; }
        public int CostOfCar { get; set; }
        public int InsuranceDuration { get; set; }
        public string CarStorage { get; set; }
    }
}