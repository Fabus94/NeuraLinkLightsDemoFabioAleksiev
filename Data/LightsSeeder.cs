using Microsoft.AspNetCore.Hosting;

namespace Lights.Data
{
    public class LightsSeeder
    {
        private readonly LightsContext _ctx;
        private readonly IHostingEnvironment _hosting;

        public LightsSeeder(LightsContext ctx, IHostingEnvironment hosting)
        {
            _ctx = ctx;
            _hosting = hosting;

        }

        public void Seed()
        {
            //make sure the datbase exist, avoid crazy exeptions
            _ctx.Database.EnsureCreated();

        }
    }
}
