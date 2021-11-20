using Microsoft.Extensions.DependencyInjection;
using ECommerce.Repository;
using ECommerce.Services.Implementation;
using ECommerce.Services.Interfaces;

namespace ECommerce.Services
{
    public static class Startup
    {

        public static IServiceCollection InitServices(this IServiceCollection services)
        {
            services.InitRepository();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<ICartService, CartService>();
            services.AddTransient<IAccountService, AccountService>();
            return services;
        }
    }
}
