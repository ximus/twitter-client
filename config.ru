ENV['RAKEP_MODE'] = ENV['RACK_ENV']

if ENV['RAKEP_MODE'] != 'production'
  require 'rake-pipeline'
  require 'rake-pipeline/middleware'
  use Rake::Pipeline::Middleware, 'Assetfile'
end

require 'rack-rewrite'
use Rack::Rewrite do
  rewrite %r{^(.*)\/$}, '$1/index.html'
end

require './server/oldserver.rb'
                                                     
run Rack::URLMap.new("/" => Rack::Directory.new('public'), "/api" => Sinatra::Application)