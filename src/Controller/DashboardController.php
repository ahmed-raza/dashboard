<?php

namespace Drupal\dashboard\Controller;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class DashboardController extends ControllerBase {
  public function index() {
    return [
      '#theme' => 'dashboard',
    ];
  }

  public function data() {
    $events   = \Drupal::entityQuery('node')->condition('type','events')->execute();
    $pages   = \Drupal::entityQuery('node')->condition('type','page')->execute();
    $articles   = \Drupal::entityQuery('node')->condition('type','article')->execute();
    $data = array('nodes' => [
      'events'   => count($events),
      'pages' => count($pages),
      'articles' => count($articles),
    ]);
    return new JsonResponse($data);
  }
}
