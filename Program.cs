using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection; //required for seeder

using Microsoft.AspNetCore.Hosting;

namespace Lights
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration(SetupConfiguration)
            .UseStartup<Startup>();

        //Conection strings in config.json
        private static void SetupConfiguration(WebHostBuilderContext arg1, IConfigurationBuilder arg2)
        {
            arg2.AddJsonFile("config.json", false, true);
        }
    }
}



