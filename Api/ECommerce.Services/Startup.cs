using Microsoft.Extensions.DependencyInjection;
using ECommerce.Repository;

namespace ECommerce.Services
{
    public static class Startup
    {

        public static IServiceCollection InitServices(this IServiceCollection services)
        {
            services.InitRepository();
            return services;
        }
    }
}
