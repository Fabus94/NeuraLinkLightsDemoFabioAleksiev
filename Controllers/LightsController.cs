using AutoMapper;
using Lights.Data;
using Lights.Data.Entities;
using Lights.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lights.Controllers
{

    [ApiController]
    [Produces("application/json")]
    public class LightsController : ControllerBase
    {
        private readonly LIghtsRepositoryTest _repository;
        private readonly ILogger<LightsController> _logger;
        private readonly IMapper _mapper;
        private readonly LightsContext _ctx;

        public LightsController(LIghtsRepositoryTest repository, ILogger<LightsController> logger, IMapper mapper, LightsContext ctx)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _ctx = ctx;
        }
        //APIs
        [Route("api/[Controller]")]
        [HttpGet]
        public ActionResult<IEnumerable<Light>> Get()
        {
            try
            {
                return Ok(_repository.GetAllLights());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all lights: {ex}");
                return BadRequest("Bad Request: Failed to get resourse");
                throw;
            }

        }

        [Route("api/[Controller]")]
        [HttpDelete]
        public IActionResult Delete(string id)
        {
            try
            {
                int numVal = Convert.ToInt32(id);

                _ctx.Database.ExecuteSqlCommand("exec DeleteEntrieLights {0}", numVal);
                return Ok();

            }
            catch (Exception ex)
            {

                _logger.LogError($"Failed to delete from Lights: {ex}");
                return BadRequest("Bad Request");
                throw;
            }
        }

        [Route("api/[Controller]/newEntrie")]
        [HttpPost]
        public IActionResult Post([FromBody] LightsViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newEntrie = _mapper.Map<LightsViewModel, Light>(model);

             
                    _repository.AddEntity(newEntrie);
                    if (_repository.SaveAll())
                    {
                        return Created($"/api/lights/{newEntrie.Id}", _mapper.Map<Light, LightsViewModel>(newEntrie));
                    }
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new Entrie to Lights: {ex}");
            }

            return BadRequest("Bad Request");

        }

        [Route("api/[Controller]/updateEntrie")]
        [HttpPost]
        public IActionResult UpdateEntrie([FromBody] LightsViewModel model)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var newEntrie = _mapper.Map<LightsViewModel, Light>(model);

                    var entity = _ctx.Lights.FirstOrDefault(i => i.Id == model.Id);

                    entity.Number = newEntrie.Number;
                    entity.Setting1 = newEntrie.Setting1;
                    entity.Setting2 = newEntrie.Setting2;
                    entity.Setting3 = newEntrie.Setting3;
                    entity.Pattern = newEntrie.Pattern;
                    entity.Datetime = newEntrie.Datetime;
                    entity.AlgorithmParameter1 = newEntrie.AlgorithmParameter1;
                    entity.AlgorithmParameter2 = newEntrie.AlgorithmParameter2;
                    entity.AlgorithmParameter3 = newEntrie.AlgorithmParameter3;
                    entity.AlgorithmParameter4 = newEntrie.AlgorithmParameter4;


                    _repository.UpdateEntity(entity);
                    if (_repository.SaveAll())
                    {
                        return Created($"/api/lights/{entity.Id}", _mapper.Map<Light, LightsViewModel>(entity));
                    }
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update a Entrie in Lights: {ex}");
            }

            return BadRequest("BadRequest");

        }

    }
}
