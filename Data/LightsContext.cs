using Lights.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Lights.Data
{
    public class LightsContext : DbContext
    {
        public LightsContext(DbContextOptions<LightsContext> options) : base(options)
        {
        }


        public DbSet<Light> Lights { get; set; }

        // restrict cascade delete
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            base.OnModelCreating(modelBuilder);
        }
    }
}
