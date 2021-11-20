using ECommerce.Models;
using ECommerce.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;


namespace ECommerce.Web.Helper
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (User)context.HttpContext.Items["User"];
            if (user == null)
            {
                var response = new ResponseData<string>();
                response.Message = "Unauthorized";
                response.Data = "May be token is invalid or expired";
                // not logged in
                context.Result = new JsonResult(response) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}
