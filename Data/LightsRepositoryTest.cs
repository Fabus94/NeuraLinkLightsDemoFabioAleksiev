using Lights.Data.Entities;
using System.Collections.Generic;

namespace Lights.Data
{
    // first two letters of the extracted repository here must be capital
    public interface LIghtsRepositoryTest
    {


        bool SaveAll();
        void AddEntity(object model);
        void UpdateEntity(object model);

        //reference for ...LightsController
        IEnumerable<Light> GetAllLights();

    }
}