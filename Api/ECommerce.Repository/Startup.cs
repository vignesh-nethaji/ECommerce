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
        .AddDbContext<ECommerceContext>(options => options.UseSqlServer("server=localhost;Database=tttttt;Trusted_Connection=True;"));

            services.AddTransient<IUserRepository, UserRepository>();
            return services;
        }
    }
}
