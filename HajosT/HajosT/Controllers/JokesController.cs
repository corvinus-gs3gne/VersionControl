using HajosT.JokeModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosT.Controllers
{
    [Route("api/jokes2")]
    [ApiController]
    public class JokesController : ControllerBase
    {
        // GET: api/<JokesController>
        [HttpGet]
        public IEnumerable<Joke> Get()
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            return context.Jokes.ToList();
        }

        // GET api/jokes2/5
        [HttpGet("{id}")]
        public Joke Get(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var keresettVicc = (from x in context.Jokes
                                where x.JokeSk == id
                                select x).FirstOrDefault();
            return keresettVicc;
        }

        // POST api/jokes2

        [HttpPost]
        public void Post([FromBody] Joke newJoke)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            context.Jokes.Add(newJoke);
            context.SaveChanges();

        }

        // PUT api/<JokesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<JokesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            FunnyDatabaseContext context = new FunnyDatabaseContext();
            var torlendoVicc = (from x in context.Jokes
                               where x.JokeSk == id
                               select x).FirstOrDefault();

            context.Remove(torlendoVicc);
        }
    }
}
