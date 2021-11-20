using ECommerce.Models;
using ECommerce.Models.ViewModels;
using ECommerce.Services.Interfaces;
using ECommerce.Web.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase, IDisposable
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        public void Dispose()
        {
            _categoryService.Dispose();
        }

        /// <summary>
        /// Get All Category Details
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAll")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            ResponseData<List<Category>> response = new ResponseData<List<Category>>();
            try
            {
                response.Message = "Category List";
                response.Data = await _categoryService.GetAll();
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }

        /// <summary>
        /// Get Category by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("Get/{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            ResponseData<Category> response = new ResponseData<Category>();
            try
            {
                response.Message = "Category List Read by Id";
                response.Data = await _categoryService.Get(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}

