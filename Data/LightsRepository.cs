using Lights.Data.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Lights.Data
{
    public class LightsRepository : LIghtsRepositoryTest
    {
        private readonly LightsContext _ctx;
        private readonly ILogger<LightsRepository> _logger;

        public LightsRepository(LightsContext ctx, ILogger<LightsRepository> logger)
        {
            _ctx = ctx;
            _logger = logger;
        }

        public void AddEntity(object model)
        {
            _ctx.Add(model);
        }

        public void UpdateEntity(object model)
        {
            _ctx.Update(model);
        }

        public bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }


        // Get our lights
        public IEnumerable<Light> GetAllLights()
        {
            try
            {
                _logger.LogInformation("GetAllLights was called");
                return _ctx.Lights
                    .OrderByDescending(m => m.Id)
                    .ToList();
            }
            catch (Exception ex)
            {

                _logger.LogError($"GetAllLights failed: {ex} ");
                return null;
            }

        }


    }

}

