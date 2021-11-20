using ECommerce.Repository.Implementation;
using ECommerce.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Repository
{
    public static class Startup
    {
        public static IServiceCollection InitRepository(this IServiceCollection services)
        {
            services.AddEntityFrameworkSqlServer()
                    .AddDbContext<ECommerceContext>(options =>
                                                    options.UseSqlServer("server=localhost;Database=ECommerce;Trusted_Connection=True;"));

            #region Repository
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ICartRepository, CartRepository>();
            #endregion
            return services;
        }
    }
}
