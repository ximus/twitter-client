require "oauth"
require "oauth/consumer"

require "rack-rewrite"

require "./server/endpoint"

use Rack::Session::Cookie, :key => 'twitter-client.session',
                           :secret => 'blastergunfromouterspacerocksinterstate66'
                                    

if ENV['RAKEP_MODE'] != 'production'
  require 'rake-pipeline'
  require 'rake-pipeline/middleware'
  use Rake::Pipeline::Middleware, 'Assetfile'
end

use Rack::Rewrite do
  rewrite %r{^(.*)\/$}, '$1/index.html'
end
                                                     
run Rack::URLMap.new("/" => Rack::Directory.new('public'), "/api" => TwitterClient::Endpoint)