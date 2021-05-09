using HajosT.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosT.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        [HttpGet]
        [Route("questions/count2")]
        public int M1()
        {
            hajostesztContext context = new hajostesztContext();
            int kerdesekSzama = context.Questions.Count();
            return kerdesekSzama;
        }

        [HttpGet]
        [Route("questionskettopontnulla/{sorszam}")]

        public ActionResult M2(int sorszam)
        {
            hajostesztContext context = new hajostesztContext();
            var kerdes = (from x in context.Questions
                          where x.QuestionId == sorszam
                          select x).FirstOrDefault();

            if (kerdes == null) return BadRequest("Nincs ilyen kérdés");

            return new JsonResult(kerdes);
            
        }
    }
}
